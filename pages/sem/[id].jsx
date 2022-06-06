import { getSeminarById } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import dynamic from "next/dynamic";
import { UserIcon, CalendarIcon, FlagIcon } from "@heroicons/react/solid";

const WidgetBot = dynamic(() => import("@widgetbot/react-embed"), {
  ssr: false,
});

export default function Sem({ id, seminars, content }) {
  let html = documentToReactComponents(content);
  const statusBadge =
    seminars.status === "ongoing" ? (
      <span className="badge text-bg-success">Ongoing</span>
    ) : seminars.status === "end" ? (
      <span className="badge text-bg-secondary">End</span>
    ) : (
      <span className="badge text-bg-primary">Upcoming</span>
    );
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

      <div className="mb-4 row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">讨论班介绍</div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item d-flex align-items-center">
                  <UserIcon
                    className="me-2"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  />{" "}
                  {seminars.host}
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <CalendarIcon
                    className="me-2"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  />{" "}
                  {seminars.date.split("T")[0]}
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <FlagIcon
                    className="me-2"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  />{" "}
                  {statusBadge}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">{seminars.title}</h5>
            </div>
            <div className="card-body">{html}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h5 className="card-header">讨论区</h5>
        <div className="card-body">
          {seminars.status !== "upcoming" ? (
            <WidgetBot
              server="982942779384688669"
              channel={seminars.channel}
              style={{
                width: "100%",
                height: "90vh",
              }}
            />
          ) : (
            <div>讨论尚未开始</div>
          )}
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
        status: sem.status,
      },
      content: sem.content?.json,
    },
  };
}
