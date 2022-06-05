async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getAllSeminars(preview) {
  const entries = await fetchGraphQL(
    `query {
        seminarCollection(order: startAt_DESC) {
          items {
            sys {
                id
            }
            title
            startAt
            hostBy
          }
        }
    }`,
    preview
  );
  return entries?.data?.seminarCollection?.items;
}

export async function getSeminarById(id, preview) {
  const entries = await fetchGraphQL(
    `query {
        seminar(id: "${id}") {
          title
          startAt
          hostBy
          channelId
          content{
            json
          }
        }
      }`,
    preview
  );
  return entries?.data?.seminar;
}
