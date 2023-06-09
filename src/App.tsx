import ContextProvider from "./contexts/ContextProvider";
import { IconContext } from "react-icons";
import { RouterProvider } from "@tanstack/router";
import { router } from "./router";

export default function App() {
  return (
    <ContextProvider>
      <IconContext.Provider
        value={{ style: { verticalAlign: "middle", fontSize: "26px" } }}
      >
        <RouterProvider router={router} />
      </IconContext.Provider>
    </ContextProvider>
  );
}
