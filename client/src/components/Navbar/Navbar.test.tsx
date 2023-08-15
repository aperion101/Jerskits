import { screen, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";
import { server } from "../../test/setup";
import { rest } from "msw";

describe("Navbar", () => {
  test("elements render correctly", () => {
    server.use(
      rest.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
        (_, res, ctx) => {
          return res(ctx.status(401));
        }
      )
    );
    renderWithProviders(
      <Router>
        <Navbar />
      </Router>
    );
    const homeElement = screen.getByAltText("Home");
    const menElement = screen.getByRole("link", { name: "Men" });
    const womanElement = screen.getByRole("link", { name: "Woman" });
    const kidsElement = screen.getByRole("link", { name: "Kids" });
    const brandsElement = screen.getByRole("link", { name: "Brands" });
    const searchElement = screen.getByRole("button", {
      name: "search",
    });
    const bagListElement = screen.getByRole("button", {
      name: "bag",
    });
    const favoriteListElement = screen.getByRole("button", {
      name: "favorite",
    });

    expect(homeElement).toBeInTheDocument();
    expect(menElement).toBeInTheDocument();
    expect(womanElement).toBeInTheDocument();
    expect(kidsElement).toBeInTheDocument();
    expect(brandsElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
    expect(bagListElement).toBeInTheDocument();
    expect(favoriteListElement).toBeInTheDocument();
    waitFor(() => {
      const signInLink = screen.getByRole("link", { name: "Sign In" });
      expect(signInLink.closest("a")).toHaveAttribute("href", "/sign-in");
    });
  });

  test("links render correctly", () => {
    server.use(
      rest.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
        (_, res, ctx) => {
          return res(ctx.status(401));
        }
      )
    );
    renderWithProviders(
      <Router>
        <Navbar />
      </Router>
    );
    const homeLink = screen.getByAltText(/home/i);
    const menLink = screen.getByRole("link", { name: "Men" });
    const womanLink = screen.getByRole("link", { name: "Woman" });
    const kidsLink = screen.getByRole("link", { name: "Kids" });
    const brandsLink = screen.getByRole("link", { name: "Brands" });

    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
    expect(menLink.closest("a")).toHaveAttribute("href", "/category/mens");
    expect(womanLink.closest("a")).toHaveAttribute("href", "/category/womans");
    expect(kidsLink.closest("a")).toHaveAttribute("href", "/category/kids");
    expect(brandsLink.closest("a")).toHaveAttribute("href", "/category/brands");
    waitFor(() => {
      const signInLink = screen.getByRole("link", { name: "Sign In" });
      expect(signInLink.closest("a")).toHaveAttribute("href", "/sign-in");
    });
  });

  test("user login with refresh token", () => {
    const { store } = renderWithProviders(
      <Router>
        <Navbar />
      </Router>,
      {
        preloadedState: {
          auth: { accessToken: null, isAuthenticated: false },
        },
      }
    );
    waitFor(() => {
      expect(store.getState().auth.isAuthenticated).toBe(true);
    });
  });
});