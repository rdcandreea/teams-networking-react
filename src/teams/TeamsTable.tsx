import { getTeamsRequest } from "./middlewear";
import "./style.css";
import React from "react";

type Team = {
  id: string;
  name: string;
  url: string;
  promotion: string;
  members: string;
};

type Props = {
  loading: boolean;
  teams: Team[];
};

export function TeamsTable(props: Props) {
  console.warn("props", props);
  // if (props.loading) {
  //   return (
  //     <div style={{ minHeight: "100px" }} className="loading-mask">
  //       Loading...please wait
  //     </div>
  //   );
  // }
  return (
    <form
      id="editForm"
      action=""
      method="post"
      className={props.loading ? "loading-mask" : ""}
    >
      <table>
        <colgroup>
          <col span={1} style={{ width: "40px" }} />
          <col span={1} style={{ width: "125px" }} />
          <col span={1} />
          <col span={1} />
          <col span={1} />
          <col span={1} style={{ width: "80px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="selectAll" id="selectAll" />
            </th>
            <th>Promotion</th>
            <th>Members</th>
            <th>Project Name</th>
            <th>Project URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.teams.map(({ id, url, promotion, members, name }) => {
            let displayURL = url;
            if (url.startsWith("https://")) {
              displayURL = url.substring(8);
            }
            return (
              <tr key={id}>
                <td>
                  <input type="checkbox" name="selected" value={"id"} />
                </td>
                <td>{promotion}</td>
                <td>{members}</td>
                <td>{name}</td>
                <td>
                  <a href={url} target="_blank">
                    {displayURL}
                  </a>
                </td>
                <td>
                  <a data-id={"id"} className="link-btn remove-btn">
                    ✖
                  </a>
                  <a data-id={"id"} className="link-btn edit-btn">
                    &#9998;
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                name="promotion"
                id="promotion"
                placeholder={"Enter Promotion"}
                required
              />
            </td>
            <td>
              <input
                type="text"
                name="members"
                id="members"
                placeholder={"Enter members"}
                required
              />
            </td>
            <td>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={"Enter project name"}
                required
              />
            </td>
            <td>
              <input
                type="text"
                name="url"
                id="url"
                placeholder={"Enter URL"}
                required
              />
            </td>
            <td>
              <button type="submit">💾</button>
              <button type="reset">✖</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
}

type WrapperProps = {};
type State = {
  loading: boolean;
  teams: Team[];
};
export class TeamsTableWrapper extends React.Component<WrapperProps, State> {
  constructor(props: WrapperProps) {
    super(props);
    console.warn("wrapper props", props);
    this.state = {
      loading: true,
      teams: [],
    };
  }

  async componentDidMount(): Promise<void> {
    console.info("mount");
    const teams = await getTeamsRequest();
    console.info("change loading", teams);
    this.setState({
      loading: false,
      teams: teams,
    });
  }

  render() {
    console.warn("render");
    return (
      <TeamsTable
        teams={this.state.teams}
        loading={this.state.loading}
      ></TeamsTable>
    );
  }
}
