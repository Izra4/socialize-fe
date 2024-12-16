import PropTypes from "prop-types";

const Comment = ({ pict, name, commentText }) => {
  return (
    <div className="w-full max-w-3xl rounded-lg bg-gray-100 mb-4">
      <div className="p-4 flex flex-row space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-b from-primary_blue to-secondary_blue border-2 border-transparent hover:border-blue-500 flex-shrink-0">
          <img
            src={pict}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col w-full max-w-full overflow-hidden">
          <p className="text-blue-500 font-semibold">{name}</p>
          <p className="break-words overflow-auto">{commentText}</p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  pict: PropTypes.string.isRequired, // pict is expected to be a string and required
  name: PropTypes.string.isRequired, // name is expected to be a string and required
  commentText: PropTypes.string.isRequired, // commentText is expected to be a string and required
};

export default Comment;
