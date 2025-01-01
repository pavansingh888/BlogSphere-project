import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {

    
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    //#Interview
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
/*
Callback Version of watch:
React.useEffect(() => {
  const subscription = watch((value, { name, type }) =>
    console.log(value, name, type)
  );
  return () => subscription.unsubscribe();
}, [watch]);
useEffect is used to set up the callback version of watch.
watch((value, { name, type }) => console.log(value, name, type)): This sets up a subscription to watch all form fields. The callback function logs the current form values, the name of the field that changed, and the type of event.
The subscription.unsubscribe() method is called in the cleanup function of useEffect to unsubscribe from the watch updates when the component unmounts or the effect dependencies change.

Arguments in the watch Callback
value:
This argument contains the current values of the form fields being watched. It is an object where each key is the name of a form field and the value is the current value of that field.
name:
This argument is a string representing the name of the form field that triggered the callback. It helps identify which specific field has changed.
type:
This argument is a string representing the type of event that triggered the callback. It typically indicates the nature of the change, such as change, blur, or submit.
*/
    React.useEffect(() => {
        const subscription = watch((value, { name }) => { //Value- is all the values we can have in the form are these values. Out of those values we are looking for the value name. So we are writing like out of all the 'values' we are looking for the 'name'.
            if (name === "title") { //if the name is title
                /*value: {title?: any;slug?: any;content?: any;status?: any;} */
                setValue("slug", slugTransform(value.title), { shouldValidate: true }/*So our basic validations will kick in in ract hook form */);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);








    return (
        <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap justify-center bg-white p-4 rounded-lg shadow-lg gap-y-4 "
      >
        {/* Left Section */}
        <div className="w-full md:w-2/3 px-4">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 w-full"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 w-full"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            className="w-full"
          />
        </div>
      
        {/* Right Section */}
        <div className="w-full md:w-1/3 px-4">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4 w-full"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full object-cover"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 w-full"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
      
    );
}