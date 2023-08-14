const Home = () => {
  return (
    <div className="home-container">
      {/* <p>
        Where you can search any pokemon and get their personal informations.
        When playing pokemon games, it is always a struggle to remember everones
        strengths and weaknesses.
      </p> */}
      <div className="intro-text">
        <h1>Discover the World of Pokémon!</h1>
        <p>
          Welcome to my Pokémon website! Explore different generations of
          Pokémon, learn about their strengths and weaknesses, and create your
          personal teams to become the ultimate Pokémon Trainer.
        </p>
      </div>

      <div className="features">
        <div className="feature">
          <h2>Pokédex</h2>
          <p>
            Check out a comprehensive Pokédex containing detailed information
            about all Pokémon species, including their types.
          </p>
        </div>

        <div className="feature">
          <h2>Generation Carousel</h2>
          <p>
            Explore different generations of Pokémon in a fun and interactive
            carousel. See how the Pokémon world has evolved across generations.
          </p>
        </div>

        <div className="feature">
          <h2>Strengths and Weaknesses</h2>
          <p>
            Discover the strengths and weaknesses of each Pokémon type. Learn
            how to strategize and build powerful teams for battles.
          </p>
        </div>

        <div className="feature">
          <h2>Personal Teams</h2>
          <p>
            Create an account and build your own personal teams of Pokémon. Save
            and manage your teams for different battles and challenges.
          </p>
        </div>

        <div className="feature">
          <h2>Pokémon Details</h2>
          <p>
            View in-depth information about each individual Pokémon, including
            their types and strenght and weaknesses.
          </p>
        </div>
        <div className="feature last-feature">
          <h2>Newsletter</h2>
          <p>
            Subscribe to our newsletter and stay up-to-date with the latest
            Pokémon news, events, and exclusive offers. Don't miss out on any
            exciting updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
