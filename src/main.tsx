import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

import App from "./App.tsx";
import store from "./store";
import { LoadingBarProvider } from "./components/UI/LoadingBar.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingBarProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
          {/* I am cloning Anilist.co and they use fontSize: 10px which I have included in the <html> tag. So that font-size is scaling down tanstack dev tools thats why standard font-size is provided in wrapper div of tanstack dev tools*/}
          <div
            style={{
              fontSize: 16,
            }}
          >
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </div>
        </Provider>
      </QueryClientProvider>
    </LoadingBarProvider>
  </React.StrictMode>
);
