import Link from "next/link";
import { getAllSeminars } from "../lib/contentful";

export default function Home({ seminars }) {
  return (
    <>
      <h2>系统安全讨论班 (Alpha Test)</h2>
      <p className="lead">System Security Seminar</p>
      <div className="row">
        <div className="col-md-6">
          <p>
            系统安全讨论班是一个自由的学习小组，通过群体讨论的形式在一段时间内学习一个特定主题。
          </p>
          <p>
            每期讨论班都有一位主理人，负责介绍主题、发起讨论、撰写总结。你也可以
            <Link href="/apply">
              <a>申请成为主理人</a>
            </Link>
            ，主持一期讨论班的运行。
          </p>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">讨论班日程</div>
            <ul className="list-group list-group-flush">
              {seminars.map((seminar) => (
                <SemListItem
                  key={seminar.sys.id}
                  id={seminar.sys.id}
                  name={seminar.title}
                  date={seminar.startAt}
                  host={seminar.hostBy}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const SemListItem = ({ id, name, date, host, active = false }) => {
  return (
    <Link href={`/sem/${id}`}>
      <li
        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start`}
      >
        <div>
          <div className="fw-bold">{name}</div>
          <div className="d-flex">
            <div>开始于{new Date(date).toLocaleDateString()}</div>
            <div className="ms-2">
              由 <span className="badge text-bg-light">{host}</span> 主理
            </div>
          </div>
        </div>
        {active ? (
          <span className="badge bg-primary">Upcoming</span>
        ) : (
          <span className="badge bg-secondary">End</span>
        )}
      </li>
    </Link>
  );
};

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let seminars = await getAllSeminars();
  return {
    props: { seminars: seminars },
  };
}
