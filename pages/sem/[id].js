import { getSeminarById } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Script from "next/script";
import dynamic from "next/dynamic";

const WidgetBot = dynamic(() => import("@widgetbot/react-embed"), {
  ssr: false,
});

export default function Sem({ id, seminars, content }) {
  let html = documentToReactComponents(content);
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>SysSecSem</a>
            </Link>
          </li>
          <li className="breadcrumb-item">{seminars.host}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {seminars.title}
          </li>
        </ol>
      </nav>
      <div className="card mb-4">
        <h5 className="card-header">{seminars.title}</h5>
        <div className="card-body">{html}</div>
      </div>

      <div className="card">
        <h5 className="card-header">讨论区</h5>
        <div className="card-body">
          <WidgetBot
            server="982942779384688669"
            channel={seminars.channel}
            style={{
              width: "100%",
              height: "90vh",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let sem = await getSeminarById(params.id);
  return {
    props: {
      id: params.id,
      seminars: {
        title: sem.title,
        date: sem.startAt,
        host: sem.hostBy,
        channel: sem.channelId,
      },
      content: sem.content?.json,
    },
  };
}
