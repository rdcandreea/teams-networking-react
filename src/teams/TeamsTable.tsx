import {
  createTeamRequest,
  deleteTeamRequest,
  getTeamsRequest,
} from "./middlewear";
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
  team: Team;
};

type Actions = {
  // deleteTeam: (id: string) => void; //we can also define deleteTeamRequest function like this
  deleteTeam(id: string): void;
  save(): void;
  inputChanged(name: string, value: string): void;
};

export function TeamsTable(props: Props & Actions) {
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
      onSubmit={(e) => {
        e.preventDefault();
        props.save();
      }}
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
                  <a
                    className="link-btn"
                    onClick={() => {
                      props.deleteTeam(id);
                    }}
                  >
                    ✖
                  </a>
                  <a className="link-btn">&#9998;</a>
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
                placeholder={"Enter Promotion"}
                required
                value={props.team.promotion}
                onChange={(e) => {
                  props.inputChanged("promotion", e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="members"
                placeholder={"Enter members"}
                required
                value={props.team.members}
                onChange={(e) => {
                  props.inputChanged("members", e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="name"
                placeholder={"Enter project name"}
                required
                value={props.team.name}
                onChange={(e) => {
                  props.inputChanged("name", e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="url"
                placeholder={"Enter URL"}
                required
                value={props.team.url}
                onChange={(e) => {
                  props.inputChanged("url", e.target.value);
                }}
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
  team: Team;
};

const emptyTeam: Team = {
  id: "",
  name: "",
  promotion: "",
  url: "",
  members: "",
};

function getEmptyTeam(): Team {
  return {
    id: "",
    name: "",
    promotion: "",
    url: "",
    members: "",
  };
}
export class TeamsTableWrapper extends React.Component<WrapperProps, State> {
  constructor(props: WrapperProps) {
    super(props);
    this.state = {
      loading: true,
      teams: [],
      team: getEmptyTeam(),
    };
  }

  componentDidMount(): void {
    console.info("mount");
    this.loadTeams();
  }

  async loadTeams() {
    const teams = await getTeamsRequest();
    console.info("change loading", teams);
    this.setState({
      loading: false,
      teams: teams,
    });
  }

  render() {
    // console.warn("render", this.props);
    return (
      <TeamsTable
        teams={this.state.teams}
        loading={this.state.loading}
        team={this.state.team}
        deleteTeam={async (teamId) => {
          console.warn("TODO please remove this", teamId);
          const status = await deleteTeamRequest(teamId);
          console.warn("status", status);
          this.loadTeams();
        }}
        save={async () => {
          const team = this.state.team;
          team.members = "NEW";
          const status = await createTeamRequest(team);
          await this.loadTeams();
          this.setState({
            team: getEmptyTeam(),
          });
        }}
        inputChanged={(name: string, value: string) => {
          console.warn("%o changed to %o", name, value);
          // this.state.team.promotion = "smth" //not ok
          this.setState((state) => ({
            team: {
              ...state.team,
              [name]: value,
            },
          }));
        }}
      ></TeamsTable>
    );
  }
}
