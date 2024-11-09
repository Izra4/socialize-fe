import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import Header from "./component/header.jsx";
import Navbar from "./component/navbar.jsx";
import { IoCloudUploadSharp } from "react-icons/io5";

export const Post = () => {
    const [text, setText] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null); // State for storing a single uploaded file
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State to control the modal visibility

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*,video/*",
        maxFiles: 1, // Restrict to one file
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setUploadedFile(acceptedFiles[0]); // Save the first file
            }
        },
    });

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            [{ color: [] }, { background: [] }],
            ["link"],
        ],
    };

    const handleCancel = () => {
        setText(""); // Clear text in the editor
        setUploadedFile(null); // Clear uploaded file
    };

    const openPreview = () => {
        setIsPreviewOpen(true);
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
    };

    const deleteFile = () => {
        setUploadedFile(null); // Clear the uploaded file
    };

    const renderPreview = () => {
        if (!uploadedFile) return null;

        const fileURL = URL.createObjectURL(uploadedFile);
        const fileType = uploadedFile.type;

        if (fileType.startsWith("image/")) {
            return <img src={fileURL} alt="Preview" className="w-full h-auto rounded-lg mb-4" />;
        } else if (fileType.startsWith("video/")) {
            return (
                <video controls className="w-full h-auto rounded-lg mb-4">
                    <source src={fileURL} type={fileType} />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return <p className="text-gray-500">Unsupported file type</p>;
        }
    };

    return (
        <>
            <div className="w-full flex flex-col min-h-screen font-montserrat">
                <Header />
                <div className="flex flex-row">
                    <Navbar />
                    <div className="w-2/3 max-h-screen mt-20 px-10 pt-5 ml-64 relative">
                        <div>
                            <p className="text-3xl font-bold mb-3">Create Your Post!</p>

                            {/* Text Editor */}
                            <div className="mb-16">
                                <ReactQuill
                                    value={text}
                                    onChange={setText}
                                    modules={modules}
                                    className="h-40"
                                    placeholder="Write your post here..."
                                />
                            </div>

                            {/* Media Upload */}
                            <div
                                {...getRootProps()}
                                className="border-2 border-dashed border-gray-300 p-8 rounded-lg flex items-center flex-col cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                <p className="text-gray-500">Drag & Drop or upload media</p>
                                <IoCloudUploadSharp className="text-4xl text-gray-500 flex items-center justify-center" />
                            </div>
                            <p className="mb-8 text-xs mt-1 text-red-600">*Only 1 file supported</p>

                            {/* Uploaded File Name with Delete Option */}
                            {uploadedFile && (
                                <div className="mb-8">
                                    <p className="font-semibold text-gray-700 mb-2">Uploaded File:</p>
                                    <div className="flex items-center space-x-4">
                                        <p
                                            onClick={openPreview}
                                            className="text-blue-500 cursor-pointer underline"
                                        >
                                            {uploadedFile.name}
                                        </p>
                                        <button
                                            onClick={deleteFile}
                                            className="text-red-500 text-sm font-semibold hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-row absolute right-0 mr-10 font-semibold space-x-3">
                                <button onClick={handleCancel} className="text-white bg-red-500 py-2 px-4 rounded-full">
                                    Cancel
                                </button>
                                <button className="text-white bg-blue-500 py-2 px-6 rounded-full">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for File Preview */}
            {isPreviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 w-3/4 max-w-lg">
                        <div className="flex justify-end">
                            <button onClick={closePreview} className="text-red-500 font-bold text-lg">&times;</button>
                        </div>
                        <div className="">
                            <p>{uploadedFile.name}</p>
                            {renderPreview()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
