function Update() {
  return (
    <>
      <div className="update-container">
        <div className="container">
          <h1>Update Profile</h1>
          <form>
            <input type="text" placeholder="Enter first name" />
            <input type="text" placeholder="Enter last name" />
            <input type="email" placeholder="Enter email" />
            <button>Update</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Update;
