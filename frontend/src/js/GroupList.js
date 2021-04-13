import React, { useContext } from "react";
import "../css/GroupList.css";
import GroupCard from "./GroupCard/GroupCard";
import { GlobalContext } from "../context/GlobalState";
import useGroupRefresh from "../hooks/useGroupRefresh";
import AddCard from "../components/GroupView/AddCard";
import useGroups from "../hooks/useGroups";
import { ReactQueryDevtools } from "react-query/devtools";

function GroupList() {
  const { groups } = useContext(GlobalContext);
  const exampleImg =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F03%2FGiraffe-Wallpaper-for-Computer.jpg&f=1&nofb=1";

  const { data, status, isSuccess } = useGroups();

  function displayGroups(groups) {
    if (!Array.isArray(groups)) return;
    return groups.map((group) => (
      <GroupCard curGroup={group} img={exampleImg} />
    ));
  }

  //    getGroups()

  return (
    <div className="groupList">
      {status === "success" ? displayGroups(data.groups) : "Loading..."}
      <GroupCard
        curGroup="Trash Overflow"
        image="https://www.hdwallpapers.in/download/skyscrapers_panorama_city_lights_4k_hd-HD.jpg"
      />
      <GroupCard
        curGroup="Busch Gardens Stans"
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallsdesk.com%2Fwp-content%2Fuploads%2F2016%2F03%2FGiraffe-Wallpaper-for-Computer.jpg&f=1&nofb=1"
      />
      <AddCard />
      <ReactQueryDevtools></ReactQueryDevtools>
    </div>
  );
}

export default GroupList;
