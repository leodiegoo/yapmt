import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { AppProvider } from "../contexts/AppContext";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Head>
            <title>YAPMT (?!)</title>
          </Head>
          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
