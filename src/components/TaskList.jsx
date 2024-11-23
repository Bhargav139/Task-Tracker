import React, { useState } from "react";

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditingData(task);
  };

  const handleSaveClick = () => {
    onEditTask(editingData);
    setEditingTaskId(null);
  };

  const handleDeleteClick = (id) => {
    onDeleteTask(id);
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) =>
              editingTaskId === task.id ? (
                <tr key={task.id}>
                  <td>
                    <input
                      type="text"
                      value={editingData.title}
                      onChange={(e) =>
                        setEditingData({ ...editingData, title: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      value={editingData.description}
                      onChange={(e) =>
                        setEditingData({ ...editingData, description: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editingData.dueDate}
                      onChange={(e) =>
                        setEditingData({ ...editingData, dueDate: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={editingData.status}
                      onChange={(e) =>
                        setEditingData({ ...editingData, status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
