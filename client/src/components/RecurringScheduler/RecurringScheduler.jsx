import React, { useEffect, useState } from "react";
import date from "date-and-time";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { axiosInstance } from "../../config";
import "./RecurringScheduler.css";
const RecurringScheduler = () => {
    const [recurringTasks, setRecurringTasks] = useState([]);

  
    recurringTasks.sort((a, b) => new Date(a.value) - new Date(b.value));
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const getRecurringSchedule = async () => {
        try {
          const response = await axiosInstance.get("/tasks/recurring");

          setRecurringTasks(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getRecurringSchedule();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        const response = await axiosInstance.delete("/tasks/deleteRecurring", {
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
      navigate("/editRecurring", { state: { item } });
    };
  
   
    return (
      <div className="dailyTaskContainer">
        <div>
          <div className="dailyTaskTitleContainer">
           
            <h1 className="dailyTaskTitle">
              Daily Recurring Schedule
            </h1>
          
          </div>
        </div>
        <div>
          <ul>
             {recurringTasks.length > 0 ? ( 
               recurringTasks.map((item) => (
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
            ) 
            : (
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                  color: "#1976d2",
          
                }}
              >
                No Recurring Tasks Scheduled
              </h1>
            )}
          </ul>
        </div>
      </div>
    );
};

export default RecurringScheduler;
