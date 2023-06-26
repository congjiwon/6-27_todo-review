import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  const reviews = useSelector((state) => state.reviews);
  const todo = todos.filter((todo) => todo.id === id)[0];
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [comments, setComments] = useState("");

  return (
    <div>
      {todo.id}
      <br />
      {todo.title}
      <br />
      {todo.body}
      <br />
      {todo.isDone.toString()}
      <br />
      <button onClick={() => navigate("/")}>이전 화면으로</button>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            dispatch({
              type: "REVIEW_ADD",
              payload: {
                id: shortid.generate(),
                user: user,
                comments: comments,
              },
            });
            setUser("");
            setComments("");
          }}
        >
          <input
            placeholder="작성자"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
            }}
          ></input>
          <input
            placeholder="댓글 내용"
            value={comments}
            onChange={(event) => {
              setComments(event.target.value);
            }}
          ></input>
          <button>댓글입력</button>
        </form>
      </div>
      <div>
        {reviews.map((review) => {
          return (
            <div>
              <p>{review.user}</p>
              <p>{review.comments}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: "REVIEW_DELETE",
                    payload: review.id,
                  });
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
