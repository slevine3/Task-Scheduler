import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DailyTask.css";
import date from "date-and-time";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { axiosInstance } from "../../config";

const DailyTask = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const now = new Date();
  const pattern = date.compile("ddd, MMM DD YYYY");

  dailyTasks.sort((a, b) => new Date(a.value) - new Date(b.value));

  const navigate = useNavigate();

  useEffect(() => {
    const getDailyTasks = async () => {
      try {
        const response = await axiosInstance.get("/tasks/daily");

        setDailyTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDailyTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete("/tasks/delete", {
        data: {
          id: id,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    navigate("/edit", { state: { item } });
  };
  const handleArrowBack = async () => {
    // try {
    //   const response = await axios.get('http://localhost:5000/api/back', {
    //   })
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleArrowForward = () => {};
  return (
    <div className="dailyTaskContainer">
      <div>
        <div className="dailyTaskTitleContainer">
          <ArrowBackIcon onClick={() => handleArrowBack} />
          <h1 className="dailyTaskTitle">
            Daily Schedule: {date.format(now, pattern)}{" "}
          </h1>
          <ArrowForwardIcon onClick={() => handleArrowForward} />
        </div>
      </div>
      <div>
        <ul>
          {dailyTasks.length > 0 ? (
            dailyTasks.map((item) => (
              <div key={item._id} className="emailContainer">
                <li className="emailTime">
                  <span className="emailItemTitle">Time: </span>
                  {moment(item.value).format("LT")}
                </li>
                <li className="emailRecipients">
                  <span className="emailItemTitle">Recipient(s):</span>{" "}
                  {item.email}
                </li>
                <li className="emailSubject">
                  <span className="emailItemTitle">Subject:</span>{" "}
                  {item.subject}
                </li>
                <li className="emailBody">
                  <span className="emailItemTitle">Body:</span> {item.body}
                </li>
                <div className="taskIcons">
                  <Button
                    onClick={() => handleDelete(item._id)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    style={{ marginRight: "30px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleEdit(item)}
                    variant="contained"
                    endIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                color: "#1976d2",
              }}
            >
              No Tasks For Today
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DailyTask;
