import React, { useState } from "react";
import { handleChangeDescription } from "../../actions/createProblem";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-bow-code'
import { useDispatch, useSelector } from "react-redux";
import ImgurUploaderInit from 'ckeditor5-imgur-uploader'


export default function ProblemDescriptionForm() {
    const desc = useSelector(state => state.createProblemReducer.description)
    const dispatch = useDispatch()
    const ImgurUploader = ImgurUploaderInit({clientID: '0c61d1804dc7f9a'})
    //const ImgurUploader = ImgurUploaderInit({clientID: `${process.env.REACT_APP_IMGUR_CLIENT_ID}`})
    return <div>
        <CKEditor
            config={{
                extraPlugins: [ImgurUploader]
            }}
            editor={ClassicEditor}
            data={desc}
            onChange={(_, editor) => {
                dispatch(handleChangeDescription(editor.getData()))
            }}
        />
    </div>
}