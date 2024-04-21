import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/AuthSlice.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
