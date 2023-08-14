
import { BACKEND } from "../../api/url";

interface Props {
  teams: any[];
  setTeamToLook: React.Dispatch<React.SetStateAction<any[]>>;
  setIsRemoved: React.Dispatch<React.SetStateAction<number>>;
}

const TeamCard = ({ teams, setTeamToLook, setIsRemoved }: Props) => {
  

  const handleTeamRemoval = async (teamId: number | string) => {
    const response = await fetch(BACKEND + "users/remove-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("user"),
        teamId: teamId,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setIsRemoved(
        Math.floor(Math.random() * Math.floor(Math.random() * 1000))
      );
    }
  };

  return (
    <>
      {teams.map((team) => {
        return (
          <div className="team-card-container" key={Math.random()}>
            <div
              className="team-remove-btn"
              onClick={() => handleTeamRemoval(team.id)}
              key={Math.random()}
            >
              <span>X</span>
            </div>
            <div className="team-name-container">
              <h5 onClick={() => setTeamToLook([team.team.name, team.id])}>
                {team.team.name}
              </h5>
            </div>
            <div className="team-img-container">
              {Array.from(Object.keys(team.team)).map((member) => {
                return member === "name" ? (
                  void 0
                ) : (
                  <div
                    className="team-member-info-container"
                    key={Math.random()}
                  >
                    <div className="team-member-img-container">
                      <img src={team.team[member].source}></img>
                    </div>
                    <div className="team-member-name">
                      <p>{member}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TeamCard;
