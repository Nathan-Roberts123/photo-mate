import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import PlusSign from "../icons/plus-sign";
import ImageInput from "../image-input";
import { Controller, useForm } from "react-hook-form";
import { post as TPost, post } from "@/lib/types";
import { modalContext } from "../Provider";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Loading from "../icons/loading";

const PostForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<TPost>();
  const [creatingPost, setCreatingPost] = useState(false);
  const { dispatch } = useContext(modalContext);
  const { toast } = useToast();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: post) => {
    setCreatingPost(true);
    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("content", data.content);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      dispatch();
      toast({
        title: "Created Post",
        description: "Post was created successfully",
      });
      setCreatingPost(false);
    } else {
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 w-full">
      <div className="grid mb-4 grid-cols-4 lg:grid-cols-8 w-full md:grid-cols-4 sm:grid-cols-4 gap-2">
        <div className="grid gap-4 mb-4 grid-cols-2 col-span-4 lg:col-span-4">
          <div className="col-span-2">
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => {
                return <Input {...field} type="text" name="title" id="title" />;
              }}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="description">Content</Label>
            <Controller
              name="content"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => {
                return <Textarea {...field} id="description" />;
              }}
            />
          </div>
        </div>
        <div className="col-span-2 lg:col-span-4 md:col-span-2 sm:col-span-2 flex flex-col ml-auto justify-start">
          <Label htmlFor="image">Image</Label>
          <Controller
            name="image"
            control={control}
            rules={{ required: true }}
            defaultValue={undefined}
            render={({ field }) => {
              return (
                <ImageInput
                  value={field.value}
                  onChange={field.onChange}
                  name="image"
                  id="image"
                />
              );
            }}
          />
          <Label className="text-red-700 text-xs">
            {errors.image &&
              errors.image.type == "required" &&
              "The image is required"}
          </Label>
        </div>
      </div>
      <Button className="flex" type="submit" disabled={creatingPost}>
        {creatingPost ? (
          <>
            <Loading />
            <span>Creating Post</span>
          </>
        ) : (
          <>
            <PlusSign />
            <span>Add new product</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default PostForm;
