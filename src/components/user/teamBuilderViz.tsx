interface Props {
  info: Map<string, string[]>;
  add: boolean;
}

const TeamBuilderViz = ({ info }: Props) => {
  return (
    <>
      {Array.from(info.keys()).map((name) => {
        const infoList = info.get(name) || [];

        return (
          <div key={name} className="team-builder-member-box">
            <img src={infoList[0]}></img>
            <p>{name}</p>
            <div className="builder-member-types-container">
              <p className="white">{infoList[1]}</p>
              <p className="white">{infoList[2]}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TeamBuilderViz;
