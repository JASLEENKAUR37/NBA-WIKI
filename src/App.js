import React, { useState, useEffect } from "react";
import "./App.css";
import CustomToolTip from './Components/Tooltip';
import AlertDialog from "./Components/Dialouge";
import { Container } from "@material-ui/core";
  


function App() {
  const [teams, setTeams] = useState([]);
  const [games, setgames] = useState([]);
  const [err, setError] = useState();
  const [selgame , setGame] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [homeTeam , setNp] = React.useState({});
  const [homeTeamscore , setNp1] = React.useState({});
  const [visitorTeamscore , setvp2] = React.useState({});
  const [visitorTeam , setVp] = React.useState({});
  const [date,dat]=React.useState({});
  const [load,setLoad]=React.useState("block");

  const handleClickOpen = () => {
    console.log('true');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectedGame = (e)=>{
    setGame(e);
  }

  const selNP = e =>{
    setNp(e);
  }
// fetching of team data through api
  const getTeams = () => {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then(res => res.json())
      .then(data => {
        setTeams(data.data);
        setLoad("none");
        return 1;
      })
      .catch(err => setError(err));
  };
// fetching of games data through api
  const getGames = () => {
    fetch("https://www.balldontlie.io/api/v1/games")
      .then(res => res.json())
      .then(data => setgames(data.data))
      .catch(err => setError(err));
  };
//condition at which data can be retrived
  useEffect(() => {
    if (teams.length <=0) {
      getTeams();
    }
    if (games.length <= 0) {
      getGames();
      console.log(games);
    }
    // console.log("oka");
  });

  return (
    //incase of an error
    // main structure of the site
    <div className="container mt-5">
      {err ? (
        <div className="alert alert-danger" role="alert">
          <strong>Error</strong> {err}
        </div>
      ) : (
        ""
      )}
      <div className="nav-wrapper" id="headd"> NBA REPO</div>
      <div>
        <div className="nav-wrapper">
          <ul
            className="nav nav-pills nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0 active"
                id="tabs-icons-text-1-tab"
                data-toggle="tab"
                href="#tabs-icons-text-1"
                role="tab"
                aria-controls="tabs-icons-text-1"
                aria-selected="true"
              >
                NBA Teams
              </a>
            </li>
            <li className="nav-item">
              <a
                class="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-2-tab"
                data-toggle="tab"
                href="#tabs-icons-text-2"
                role="tab"
                aria-controls="tabs-icons-text-2"
                aria-selected="false"
              >
                NBA Games
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="card shadow">
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="tabs-icons-text-1"
              role="tabpanel"
              aria-labelledby="tabs-icons-text-1-tab"
            >
              <h1 style={{display : load}}>Loading........</h1> 
              <div class="container">
                <div class="row">
                  { /* data fetched from api is being loaded to the container */
                  teams.map((team , index) => {
                    // var x=team.full_name+" \n "+"city :"+team.city;
                      return (

                        <div key={index} style={{ padding: 30 }} class="col-sm-3">
                          <CustomToolTip team_name={team.full_name + "("+team.abbreviation+")"} team_city={team.city} team_conference={team.conference} team_division={team.division} >
                            <strong id="style">{team.name}</strong><br />
                            <span id="division">{team.division}</span>
                          </CustomToolTip>
                      </div>
                    );
                  
                

                })}
                </div>
              </div>
            </div>

            {/* Break Point ED7C4D */}
            <div
              class="tab-pane fade"
              id="tabs-icons-text-2"
              role="tabpanel"
              aria-labelledby="tabs-icons-text-2-tab"
            >
              <AlertDialog data={selgame} home_team={homeTeam} date={date} visitorTeam={visitorTeam}  home_team_score={homeTeamscore} visitor_team_score={visitorTeamscore} handleClose={handleClose} open={open} />
              <div class="container">
                <div class="row">
                
                  {games.map((game,index) => {
                    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat","Sun"];
                    const months=["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
                    const date = new Date(game.date);
                    const day = days[date.getDay()];
                    const number = date.getDate();
                    const month = months[date.getMonth()];
                    const year = date.getFullYear();
                    const gamedate =
                      day + ", " + number + " " + month + " " + year;
                    // console.log(game);
                    return (
                      
                      <div key={index} className="games" style={{  padding: 30 }} class="col-sm-3"
                      >
                        
                        
                        <strong  id="styles" onClick={()=>{
                          selectedGame(game)
                          selNP(game.home_team);
                          setNp1(game.home_team_score);
                          setvp2(game.visitor_team_score);
                          setVp(game.visitor_team);
                          dat(game.date);
                          handleClickOpen();
                        }} style={{cursor : "pointer"}} >{gamedate}</strong>
                       
                        <span id="styling">{game.status}</span>
                      
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="tabs-icons-text-3"
              role="tabpanel"
              aria-labelledby="tabs-icons-text-3-tab"
            >
              <div class="container">
                <div class="row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
