export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SettingsPartsFragmentDoc = gql`
    fragment SettingsParts on Settings {
  __typename
  heroTitle
  heroSubtitle
  introHeading
  introText
  bookingUrl
  heroImage
}
    `;
export const TeamPartsFragmentDoc = gql`
    fragment TeamParts on Team {
  __typename
  name
  role
  bio
  photo
}
    `;
export const InfoPartsFragmentDoc = gql`
    fragment InfoParts on Info {
  __typename
  address
  mapsUrl
  hours
  phone
  email
  instagram
}
    `;
export const SettingsDocument = gql`
    query settings($relativePath: String!) {
  settings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SettingsParts
  }
}
    ${SettingsPartsFragmentDoc}`;
export const SettingsConnectionDocument = gql`
    query settingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SettingsFilter) {
  settingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SettingsParts
      }
    }
  }
}
    ${SettingsPartsFragmentDoc}`;
export const TeamDocument = gql`
    query team($relativePath: String!) {
  team(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TeamParts
  }
}
    ${TeamPartsFragmentDoc}`;
export const TeamConnectionDocument = gql`
    query teamConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TeamFilter) {
  teamConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TeamParts
      }
    }
  }
}
    ${TeamPartsFragmentDoc}`;
export const InfoDocument = gql`
    query info($relativePath: String!) {
  info(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...InfoParts
  }
}
    ${InfoPartsFragmentDoc}`;
export const InfoConnectionDocument = gql`
    query infoConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: InfoFilter) {
  infoConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...InfoParts
      }
    }
  }
}
    ${InfoPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    settings(variables, options) {
      return requester(SettingsDocument, variables, options);
    },
    settingsConnection(variables, options) {
      return requester(SettingsConnectionDocument, variables, options);
    },
    team(variables, options) {
      return requester(TeamDocument, variables, options);
    },
    teamConnection(variables, options) {
      return requester(TeamConnectionDocument, variables, options);
    },
    info(variables, options) {
      return requester(InfoDocument, variables, options);
    },
    infoConnection(variables, options) {
      return requester(InfoConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
