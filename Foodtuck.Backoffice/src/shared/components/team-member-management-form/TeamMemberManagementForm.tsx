import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ITeamMember } from "../team-management/TeamManagement";
import FileUploader from "../../controls/file-uploader/FileUploader";
import { useEffect, useRef, useState } from "react";
import Cropper from "../../controls/cropper/Cropper";
import { IPicture } from "../../interfaces/picture";

interface IProps {
  member: ITeamMember, 
  onMemberUpdate: (member: ITeamMember) => void,
}

const cropperSettings = [
  {aspectRatio: 312/380},
  {aspectRatio: 312/380},
  {aspectRatio: 312/380},
]

function TeamMemberManagementForm({ member, onMemberUpdate }: IProps) {
  const croppedImg = useRef<IPicture | null>(member.img);

	const {
		register,
		handleSubmit,
		watch,
		formState,
	} = useForm();

  return (
    <form onSubmit={
      handleSubmit(
        (formData) => onMemberUpdate(
          {
            ...formData, 
            id: member.id, 
            img: croppedImg.current
          } as ITeamMember
        )
      )
    }>
      <Cropper 
        data={croppedImg.current}
        settings={[
          {width: 315, height: 380, media: '(min-width: 1024px)'},
          {width: 315, height: 380, media: '(min-width: 768px)'},
          {width: 315, height: 380, media: '(max-width: 767px)'},
        ]} 
        onCropsChanged={(data) => croppedImg.current = data}
      />

      <TextField 
        label="Name" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...register("name", {value: member.name ?? ''})}
        fullWidth
      />

      <TextField 
        label="Surname" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...register("surname", {value: member.surname ?? ''})}
        fullWidth
      />

      <TextField 
        label="Job title" 
        variant="outlined" 
        size="small"
        sx={{ mb:1 }}
        {...register("jobTitle", {value: member.jobTitle ?? ''})}
        fullWidth
      />

      <Button type="submit" variant="contained">Save member</Button>
    </form>
  )
}

export default TeamMemberManagementForm;