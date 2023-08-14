interface Props {
  teamName: string;
  teams: any[];
  teamId: any;
  setTeamLookingAt: React.Dispatch<React.SetStateAction<any[]>>;
}

const SpecificTeam = ({ teamName, teams, teamId, setTeamLookingAt }: Props) => {
  const teamInfo = teams.filter(
    (team) => team.team.name === teamName && team.id === teamId
  )[0];

  const teamMembers = Object.keys(teamInfo.team);
  return (
    <>
      <div
        className="previous-page-btn"
        onClick={() => {
          setTeamLookingAt([]);
        }}
      >
        <img src="../../../../public/back-arrow.png" alt="" />
      </div>
      <h2>{`Team Name: ${teamName}`}</h2>
      <br />
      <div className="specific-team-container">
        <div className="specific-team-member-container one">
          <div className="spec-member-img">
            <img src={teamInfo.team[teamMembers[0]].source}></img>
          </div>
          <div className="spec-member-lvl">LVL 40</div>
          <div className="spec-member-name">
            <p className="no-margins">{teamMembers[0]}</p>
          </div>
          <div className="spec-member-hp">
            <img
              src="https://whatsticker.online/stickers_asset/ws-pack-329/47c2c3ccc791.png"
              alt="HP"
            />
          </div>
          <div className="spec-member-types">
            {teamInfo.team[teamMembers[0]].type2 ? (
              <>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[0]].type1}
                </p>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[0]].type2}
                </p>
              </>
            ) : (
              <p className="no-margins">
                {teamInfo.team[teamMembers[0]].type1}
              </p>
            )}
          </div>
        </div>
        <div className="specific-team-member-container two">
          <div className="spec-member-img">
            <img src={teamInfo.team[teamMembers[1]].source}></img>
          </div>
          <div className="spec-member-lvl">LVL 40</div>
          <div className="spec-member-name">
            <p className="no-margins">{teamMembers[1]}</p>
          </div>
          <div className="spec-member-hp">
            <img
              src="https://whatsticker.online/stickers_asset/ws-pack-329/47c2c3ccc791.png"
              alt="HP"
            />
          </div>
          <div className="spec-member-types">
            {teamInfo.team[teamMembers[1]].type2 ? (
              <>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[1]].type1}
                </p>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[1]].type2}
                </p>
              </>
            ) : (
              <p className="no-margins">
                {teamInfo.team[teamMembers[1]].type1}
              </p>
            )}
          </div>
        </div>
        <div className="specific-team-member-container three">
          <div className="spec-member-img">
            <img src={teamInfo.team[teamMembers[2]].source}></img>
          </div>
          <div className="spec-member-lvl">LVL 40</div>
          <div className="spec-member-name">
            <p className="no-margins">{teamMembers[2]}</p>
          </div>
          <div className="spec-member-hp">
            <img
              src="https://whatsticker.online/stickers_asset/ws-pack-329/47c2c3ccc791.png"
              alt="HP"
            />
          </div>
          <div className="spec-member-types">
            {teamInfo.team[teamMembers[2]].type2 ? (
              <>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[2]].type1}
                </p>
                <p className="no-margins">{"&"}</p>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[2]].type2}
                </p>
              </>
            ) : (
              <p className="no-margins">
                {teamInfo.team[teamMembers[2]].type1}
              </p>
            )}
          </div>
        </div>
        <div className="specific-team-member-container four">
          <div className="spec-member-img">
            <img src={teamInfo.team[teamMembers[3]].source}></img>
          </div>
          <div className="spec-member-lvl">LVL 40</div>
          <div className="spec-member-name">
            <p className="no-margins">{teamMembers[3]}</p>
          </div>
          <div className="spec-member-hp">
            <img
              src="https://whatsticker.online/stickers_asset/ws-pack-329/47c2c3ccc791.png"
              alt="HP"
            />
          </div>
          <div className="spec-member-types">
            {teamInfo.team[teamMembers[3]].type2 ? (
              <>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[3]].type1}
                </p>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[3]].type2}
                </p>
              </>
            ) : (
              <p className="no-margins">
                {teamInfo.team[teamMembers[3]].type1}
              </p>
            )}
          </div>
        </div>
        <div className="specific-team-member-container five">
          <div className="spec-member-img">
            <img src={teamInfo.team[teamMembers[4]].source}></img>
          </div>
          <div className="spec-member-lvl">LVL 40</div>
          <div className="spec-member-name">
            <p className="no-margins">{teamMembers[4]}</p>
          </div>
          <div className="spec-member-hp">
            <img
              src="https://whatsticker.online/stickers_asset/ws-pack-329/47c2c3ccc791.png"
              alt="HP"
            />
          </div>
          <div className="spec-member-types">
            {teamInfo.team[teamMembers[4]].type2 ? (
              <>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[4]].type1}
                </p>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[4]].type2}
                </p>
              </>
            ) : (
              <p className="no-margins">
                {teamInfo.team[teamMembers[4]].type1}
              </p>
            )}
          </div>
        </div>
        <div className="specific-team-member-container six">
          <div className="spec-member-img">
            <img src={teamInfo.team[teamMembers[5]].source}></img>
          </div>
          <div className="spec-member-lvl">LVL 40</div>
          <div className="spec-member-name">
            <p className="no-margins">{teamMembers[5]}</p>
          </div>
          <div className="spec-member-hp">
            <img
              src="https://whatsticker.online/stickers_asset/ws-pack-329/47c2c3ccc791.png"
              alt="HP"
            />
          </div>
          <div className="spec-member-types">
            {teamInfo.team[teamMembers[5]].type2 ? (
              <>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[5]].type1}
                </p>
                <p className="no-margins">
                  {teamInfo.team[teamMembers[5]].type2}
                </p>
              </>
            ) : (
              <p className="no-margins">
                {teamInfo.team[teamMembers[5]].type1}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificTeam;
