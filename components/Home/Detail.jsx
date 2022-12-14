import NavBar from "../Home/NavBar";
import { CenterContainer } from "../../styles/styledComps";
import Image from "../D3Components/Image/ImageComp.jsx";
import Button from "../D3Components/Button/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Ammenities from "../D3Components/Listings/ammenities";
import Info from "../D3Components/Listings/info";
import Description from "../D3Components/Listings/description";
import Rules from "../D3Components/Listings/rules";
import Chat from "../../pages/chat";
import { useRouter } from "next/router";

const Detail = ({ state }) => {
  const router = useRouter();
  const buttonHandler = () => {
    router.push("/chat");
  };
  if (state.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div className="absolute w-full h-auto">
          <NavBar />
        </div>

        <Image
          src={state.image && state.image}
          width="2000px"
          height="1300px"
        />

        <div className="flex flex-col items-left justify-left ml-5">
          <Info state={state} />
          <Description state={state} />
          <Ammenities state={state} />
          <Rules state={state} />
        </div>

        <CenterContainer>
          <div className="m-10">
            <Button
              txt="Contact Host"
              fontSize="16px"
              endIcon={<ArrowForwardIcon />}
              onBtnClick={buttonHandler}
            />
          </div>
        </CenterContainer>
      </div>
    </>
  );
};
export default Detail;

// function Listings() {
//   return (
//     <div key={state.id}>
//       <div>Address: {state.addressLine1}</div>
//       <div>City: {state.city}</div>
//       <div>Province: {state.province}</div>
//       <div>Postal Code: {state.postalCode}</div>
//       <div>Description: {state.description}</div>
//       <div>Guests: {state.guests}</div>
//       <div>bedrooms: {state.bedrooms}</div>
//       <div>beds: {state.beds}</div>
//       <div>bathrooms: {state.bathrooms}</div>
//       <div>kitchen: {state.kitchen}</div>
//       <div>parking: {state.parking}</div>
//       <div>Washer: {state.washer}</div>
//       <div>Dryer: {state.dryer}</div>
//       <div>petsAllowed: {state.petsAllowed}</div>
//       <div>smokingAllowed: {state.smokingAllowed}</div>
//       <div>Wifi: {state.wifi}</div>
//       <div>TV: {state.tv}</div>
//       <div>AC: {state.airConditioning}</div>
//       <div>Heating: {state.heating}</div>
//       {state.image && <img src={state.image} />}
//     </div>
//   );
// }
