import { useState, useEffect, useCallback } from "react";
import "./memos.scss";

export const Memos = ({
  chaiContractInst: { provider, signer, chaiContract },
}) => {
  const [memos, setMemos] = useState([]);

  const getMemosCallback = async () => {
    console.log("getMemosCallback get callded");
    const memosList = await chaiContract.getMemos();
    setMemos(memosList);
    console.log("memos", memos);
  };

  useEffect(() => {
    const getMemos = async () => {
      const memosList = await chaiContract.getMemos();
      setMemos(memosList);
      console.log("memos", memos);
    };
    try {
      getMemos();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section>
      <h4>Memo list</h4>
      <button onClick={() => getMemosCallback()}>fetch memos</button>
      <section className="memos--container">
        <div className="memos__thead-row">
          <div className="memos__thead-row--th">Name</div>
          <div className="memos__thead-row--th">Message</div>
          <div className="memos__thead-row--th">Address</div>
        </div>
        {memos.map(([name, message, , sender_address], index) => {
          return (
            <div
              className="memos__tbody-row"
              key={sender_address}
            >
              <div className="memos__tbody-row--td">{name}</div>
              <div className="memos__tbody-row--td">{message}</div>
              <div className="memos__tbody-row--td">{sender_address}</div>
            </div>
          );
        })}
      </section>
    </section>
  );
};