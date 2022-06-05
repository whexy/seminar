import Link from "next/link";
import { getAllSeminars } from "../lib/contentful";

export default function Home({ seminars }) {
  return (
    <>
      <h2>系统安全讨论班 (Alpha Test)</h2>
      <div className="row">
        <div className="col-md-6">
          <p className="lead">
            <strong>系统安全讨论班</strong>
            是一个自由的学习小组。小组成员通过阅读与讨论的形式在一段时间内集中学习一个特定主题。
          </p>
          <h5>参加讨论班</h5>
          <p>
            讨论班欢迎对系统安全有兴趣的同好！无需注册登录，在页面右侧（或下方）的讨论班日程表中找到你喜欢的话题，点击即可进入讨论班。
          </p>
          <h5>主理人</h5>
          <p>
            每期讨论班都有一位主理人，负责介绍主题、发起讨论与撰写总结。主理人还需清理讨论区中的有害言论，维护良好的社区环境。主理人发起的话题需要通过委员会的认可，委员会也可随时终结主理人的管理权限。
          </p>
          <p>
            如果感兴趣，你也可以
            <a href="http://localhost:3000/apply">申请成为主理人</a>
            ，主持一期讨论班的运行。
          </p>
          <h5>讨论班状态</h5>
          <p>在日程表中的讨论班有三种状态：</p>
          <figure>
            <table className="table">
              <thead>
                <tr>
                  <th>标志</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="badge text-bg-success">Ongoing</span>
                  </td>
                  <td>
                    讨论正在进行。主理人在白板上介绍讨论主题，并提供参考资料。您可以进入讨论班参与讨论。
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <span className="badge text-bg-secondary">End</span>
                  </td>
                  <td>
                    讨论已经终结。主理人根据讨论内容撰写总结，并发布在白板上。您可以进入讨论班查看总结内容。
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="badge text-bg-primary">Upcoming</span>
                  </td>
                  <td>
                    讨论即将开始。主理人正在整理相关材料。您可以提前了解相关话题，并预约参加讨论。
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>
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
        style={{ cursor: "pointer" }}
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
