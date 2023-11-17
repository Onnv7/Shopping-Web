import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary.dto';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    uploadPreset: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { upload_preset: uploadPreset },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async deleteFileFromPublicId(publicId: string): Promise<boolean> {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    return true;
  }
}
