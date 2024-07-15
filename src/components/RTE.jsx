import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

//our editor is getting designed at a seperate place as a component, and we will use it in some forms n all, so from there how will we get reference of this editor. So for that we can use forward ref. but there is another way/concept known as controller.
//control - will come from react react hook form, and it is responsible to take all of this editors state to the form which is using this Editor component.(Editor is component, so from component to form the form which is using this component)
export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
    
    <Controller
    name={name || "content"}
    control={control} //this control will give control(event,value,data) to the parent element which have given this control.
    render={({field: {onChange}}) => ( //how will it render, we will have a field, on that field we will apply tracking. so that what change is happening should be informed to parent component with render.
        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange} //if there's any change on editor, so our field will be governed with the onChange as we have provided field: {onChange} to Controller.
        />
    )}
    />

     </div>
  )
}
