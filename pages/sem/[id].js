import { getAllSeminars, getSeminarById } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export default function Sem({ seminars, content }) {
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
      <div className="card">
        <h5 className="card-header">{seminars.title}</h5>
        <div className="card-body">{html}</div>
      </div>
    </div>
  );
}

// export async function getStaticPaths() {
//   let seminars = await getAllSeminars();

//   const paths = seminars.map((sem) => ({
//     params: { id: sem.sys.id },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let sem = await getSeminarById(params.id);
  return {
    props: {
      seminars: {
        title: sem.title,
        date: sem.startAt,
        host: sem.hostBy,
      },
      content: sem.content?.json,
    },
  };
}
