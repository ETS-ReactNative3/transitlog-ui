import {ApolloClient} from "apollo-client";
import {concat} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {onError} from "apollo-link-error";
import get from "lodash/get";

const serverUrl = process.env.REACT_APP_TRANSITLOG_SERVER_GRAPHQL;

if (!serverUrl) {
  console.error("Tansitlog server URL not set!");
}

function createErrorLink(UIStore) {
  function notifyError(type, message, target) {
    if (UIStore) {
      return UIStore.addError(type, message, target);
    }

    console.warn(`${type} error: ${message}, target: ${target}`);
  }

  return onError(({graphQLErrors, networkError, operation}) => {
    if (graphQLErrors && process.env.NODE_ENV === "development") {
      graphQLErrors.map((err) => console.warn(err.message));
    }

    if (networkError) {
      notifyError(
        "Network",
        get(
          networkError,
          "message",
          JSON.stringify(get(networkError, "result", networkError))
        ),
        operation.operationName
      );
    }
  });
}

let createdClient = null;

export const getClient = (UIStore) => {
  if (createdClient) {
    return createdClient;
  }

  const errorLink = createErrorLink(UIStore);
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: serverUrl,
    credentials: "include",
  });

  createdClient = new ApolloClient({
    link: concat(errorLink, httpLink),
    cache: cache,
  });

  return createdClient;
};
