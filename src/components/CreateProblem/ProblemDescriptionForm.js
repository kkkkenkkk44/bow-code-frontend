import React, { useState } from "react";
import { handleChangeDescription } from "../../actions/createProblem";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch, useSelector } from "react-redux";


export default function ProblemDescriptionForm() {
    const desc = useSelector(state => state.createProblemReducer.description)
    const dispatch = useDispatch()
    return <div>
        <CKEditor
            editor={ClassicEditor}
            data={desc}
            onChange={(_, editor) => {
                dispatch(handleChangeDescription(editor.getData()))
            }}
        />
    </div>
}