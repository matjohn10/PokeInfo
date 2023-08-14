import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./team.css";
import BuilderMode from "./builderMode";
import { BACKEND } from "../../api/url";
import TeamCard from "./teamCard";
import SpecificTeam from "./specificTeam";

interface Props {
  pokemons: Map<string, unknown>;
  img: Map<string, any>;
}

const PersonnalTeam = ({ pokemons, img }: Props) => {
  const navigate = useNavigate();
  const [hasTeam, setHasTeam] = useState(false);
  const [isBuilder, setIsBuilder] = useState(true);
  const [pokeTeams, setPokeTeams] = useState<any[]>([]);
  const [lookingAtTeam, setLookingAtTeam] = useState<any[]>([]);
  const [teamRemoval, setTeamRemoval] = useState(0); // used to refetch teams in database
  const [teamAddition, setTeamAddition] = useState(0); // used to refetch teams in database
  const USER = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const { data, isLoading } = useQuery({
    queryKey: ["teams", teamRemoval, teamAddition],
    queryFn: async () => {
      const response = await fetch(BACKEND + "users/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: USER.email,
        }),
      });
      const data = await response.json();
      return data;
    },
  });

  // check team in db in the HANDLETEAM function
  // current state might not be able to see addition of team during same session
  useEffect(() => {
    if (!USER) {
      localStorage.removeItem("token");
      navigate("/connection");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data.success) {
      setPokeTeams(data.teams);
      setHasTeam(true);
      setIsBuilder(false);
    } else if (!isLoading && data.status === 204) {
      setIsBuilder(true);
      setHasTeam(false);
      setPokeTeams([]);
    } // else just goes to buidler mode as it is true by default
  }, [data]);

  const handleTeam = () => {
    if (!hasTeam) {
      return <p>Add team</p>;
    }
    // Receive a list of teams, use map to make it easy to make multiple team cards
    return (
      <TeamCard
        teams={pokeTeams}
        setTeamToLook={setLookingAtTeam}
        setIsRemoved={setTeamRemoval}
      />
    );
  };

  return (
    <div className="team-outer-container">
      {lookingAtTeam.length === 0 ? (
        <>
          <h2>{!isBuilder ? "Your Teams" : "Build a Team"}</h2>
          <div className="teams-viz-container">
            {!isBuilder ? (
              <>
                {" "}
                <div className="team-control-panel-container">
                  <button
                    className="team-control-btn"
                    onClick={() => {
                      setIsBuilder(true);
                    }}
                  >
                    Add Team
                  </button>
                  <button className="team-control-btn">Modify</button>
                </div>
                <div className="teams-list-container">{handleTeam()}</div>
              </>
            ) : (
              <BuilderMode
                pokemons={pokemons}
                img={img}
                builderMode={setIsBuilder}
                isTeamAdded={setTeamAddition}
              />
            )}
          </div>
        </>
      ) : (
        <SpecificTeam
          teams={pokeTeams}
          teamName={lookingAtTeam[0]}
          teamId={lookingAtTeam[1]}
          setTeamLookingAt={setLookingAtTeam}
        />
      )}
    </div>
  );
};

export default PersonnalTeam;
