import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from "../conf/conf";

//our editor is getting designed at a seperate place as a component, and we will use it in some forms n all, so from there how will we get reference of this editor. So for that we can use forward ref. but there is another way/concept known as controller.
//control - will come from react react hook form, and it is responsible to take all of this editors state to the form which is using this Editor component.(Editor is component, so from component to form the form which is using this component)
export default function RTE({ name, control, label, defaultValue = "", rules }) {
  return (
    <div className="w-full">
     

      <Controller
        name={name || "content"}
        control={control}
        rules={{
          ...rules, // Include validation rules passed down
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
             {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Editor
              apiKey={conf.rteApiKey}
              initialValue={defaultValue}
              init={{
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
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              value={value} // Value bound to field
              onEditorChange={onChange} // Update the field value on change
            />
            {/* Show Validation Error */}
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </div>
        )}
      />
    </div>
  );
}
