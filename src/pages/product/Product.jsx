import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/char/Chart"
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProducts } from "../../redux/apiCalls";


export default function Product() {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);

    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("order/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    // // Updating Product Details
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    }

    const handleColor = (e) => {
        setColor(e.target.value.split(","));
    }

    const handleSize = (e) => {
        setSize(e.target.value.split(","));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const updatedProductData = {
                        ...inputs,
                        img: downloadURL,
                        categories: cat,
                        color: color,
                        size: size
                    };

                    updateProducts(productId, updatedProductData, dispatch);
                    window.alert("Product Data is Updated. See the product table😀")
                } catch (error) {
                    console.error("Error getting download URL:", error);
                }
            }
        );
    };


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newProduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey"><b>id:</b>{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In stock: </span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input name="title" type="text" placeholder={product.title} onChange={handleChange} className="inputContainer" />
                        <label>Product Descripton</label>
                        <input name="desc" type="text" placeholder={product.desc} onChange={handleChange} />
                        <label>Product Catergories</label>
                        <input name="categories" type="text" placeholder={product.categories} onChange={handleCat} />
                        <label>Product Color</label>
                        <input name="color" type="text" placeholder={product.color} onChange={handleColor} />
                        <label>Product Size</label>
                        <input name="size" type="text" placeholder={product.size} onChange={handleSize} />
                        <label>Product Price</label>
                        <input name="price" type="text" placeholder={product.price} onChange={handleChange} />
                        <label>Product In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        </div>
                        <button className="productButton" onClick={handleClick}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}