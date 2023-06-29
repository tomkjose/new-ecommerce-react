import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/productItem.css";
const Navbar = () => {
  const navigate = useNavigate();
  let total = useSelector((state) => state.totalCart);
  return (
    <nav
      className="navbar navbar-expand-lg p-4 align-items-center"
      style={style.nav}
    >
      <div className="container-fluid">
        <a className="navbar-brand fs-3" href="/" style={style.navHead}>
          E-cart
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-dark" href="/">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/addproducts"
                className="nav-link active text-dark listItem"
              >
                Add a product
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-5 position-relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2838/2838838.png"
              alt="error"
              width={"40rem"}
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            />
            {total ? (
              <p
                className="bg-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  top: "21%",
                  left: "20%",
                }}
              >
                {total}
              </p>
            ) : (
              ""
            )}
            <img
              className="avatar"
              src="https://iili.io/HJNb7FR.md.jpg"
              alt="error"
              width={"40rem"}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
const style = {
  nav: {
    backgroundColor: "var(#eff0f9)",
  },
  navHead: {
    fontFamily: "var(--fontStyle)",
    color: "black",
  },
};

export default Navbar;
