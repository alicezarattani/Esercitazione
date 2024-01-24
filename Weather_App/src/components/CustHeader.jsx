import Search_Icon from "../Images/Icons/search.png";

function Header() {
  return (
    <>
      <input type="text" placeholder="Inserisci la città" />
      <img src={Search_Icon} alt="Search Icon"></img>
    </>
  );
}
export default Header;
