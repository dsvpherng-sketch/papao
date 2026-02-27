import { createClient } from "../lib/supabase/client";

const supabase = createClient();

//Upload File
export async function ImageUpload(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { dataup, errorup } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (errorup) {
    return errorup;
  }
  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return data.publicUrl;
}

//C-R-U-D

//C = Create / Add / Insert
export async function insertdata(tablename,payload) {
  const { data, error } = await supabase.from(tablename).insert(payload)
  if (data) {
    return data;
  } else {
    return error;
  }
}

//R = Read / GET /SELECT
export async function getdata(tablename) {
  const { data, error } = await supabase.from(tablename).select("*");
  if (data) {
    return data;
  } else {
    return error;
  }
}

//U = Update / Edit
export async function editdata(tablename,payload,column,id) {
  const { data, error } = await supabase.from(tablename).update(payload).eq(column,id)
  if (data) {
    return data;
  } else {
    return error;
  }
}
//D = Delete
export async function deletedata(tablename,column,id) {
  const { data, error } = await supabase.from(tablename).delete().eq(column,id)
  if (data) {
    return data;
  } else {
    return error;
  }
}