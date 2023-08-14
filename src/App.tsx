import "./App.css";
import "./components/user/connection.css";
import { useState } from "react";
import { BACKEND } from "./api/url";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import "./componentCss/cardColours.css";
import TopNavBar from "./components/topNavBar";
import PokedexPage from "./components/pokedexPage";
import MainPageV3 from "./components/mainPageV3";
import PokemonPage from "./components/pokemonPage";
import LoadingScreen from "./components/loader/loadingScreen";
import UserConnectPage from "./components/user/userConnectPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import PersonnalTeam from "./components/user/personnalTeam";
import ProfilePage from "./components/user/profilePage";
import ForgotPassword from "./components/user/forgotPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Error404 from "./components/errorPages/error404";
import Home from "./components/home";
import ResetForm from "./components/user/resetForm";
import Randomizer from "./components/randomizer";

const GEN = new Map<number, number[]>([
  [1, [1, 151]],
  [2, [152, 251]],
  [3, [252, 386]],
  [4, [387, 493]],
  [5, [494, 649]],
  [6, [650, 721]],
  [7, [722, 809]],
  [8, [810, 905]],
  [9, [906, 1008]],
]);

const App = () => {
  let [carouselName, setCarouselName] = useState("");
  let [logged, setLogged] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [pokemonQuery, imgQuery] = useQueries({
    queries: [
      {
        queryKey: ["pokemons"],
        queryFn: async () =>
          axios.get(BACKEND + "get/pokemons").then((res) => res.data),
      },
      {
        queryKey: ["imgs"],
        queryFn: async () =>
          axios.get(BACKEND + "get/image").then((res) => res.data),
      },
    ],
  });
  if (
    pokemonQuery.isFetching ||
    pokemonQuery.isLoading ||
    imgQuery.isLoading ||
    imgQuery.isFetching
  ) {
    return <LoadingScreen />;
  }

  const POKEMONS = new Map(Object.entries(pokemonQuery.data));
  //Images are not really used, I used the static folder of the api instead
  const POKEIMGS = new Map(Object.entries(imgQuery.data));
  return (
    <Router>
      <TopNavBar
        pokemons={POKEMONS}
        setCarouselName={setCarouselName}
        logged={logged}
        setLogged={setLogged}
        setCurrUser={setCurrUser}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/carousel"
          element={
            <MainPageV3
              gens={GEN}
              pokemons={POKEMONS}
              img={POKEIMGS}
              setCarouselName={setCarouselName}
            />
          }
        ></Route>
        <Route
          path="/pokedex/"
          element={
            <PokedexPage
              gens={GEN}
              pokemons={POKEMONS}
              imgs={POKEIMGS}
              setCarouselName={setCarouselName}
            />
          }
        ></Route>
        <Route
          path={"/pokedex/" + carouselName}
          element={
            <PokemonPage
              pokemonName={carouselName}
              setCarouselName={setCarouselName}
            />
          }
        ></Route>
        <Route
          path="/randomizer"
          element={
            <Randomizer pokemons={POKEMONS} gens={GEN} imgs={POKEIMGS} />
          }
        ></Route>
        {/* <Route path="/credits" element={<div>Credits Page</div>}></Route> */}
        <Route
          path="/connection"
          element={
            <UserConnectPage setLogged={setLogged} setUser={setCurrUser} />
          }
        ></Route>
        <Route
          path="forgot-password"
          element={
            <ForgotPassword setLogged={setLogged} setUser={setCurrUser} />
          }
        ></Route>
        <Route element={<PrivateRoutes currUser={currUser} />}>
          <Route
            path="/team"
            element={<PersonnalTeam pokemons={POKEMONS} img={POKEIMGS} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/reset-form"
            element={<ResetForm setResetForm={null} />}
          />
        </Route>
        <Route path="/error/:message" element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
