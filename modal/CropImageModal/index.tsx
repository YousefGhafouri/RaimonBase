import React, { JSX, useCallback, useState } from 'react';
import Cropper, { CropperProps } from 'react-easy-crop';
import { Modal, Slider, Typography } from '@mui/material';
import { getCroppedImg } from './canvasUtils';
import styles from './styles.module.css';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
import ConditionalRender from '@Base/components/ConditionalRendering';
import { $compress } from '@Base/helpers/compressImage';

export interface CropperResult {
    imageFile: File;
    browserImage: string;
    blob: Blob;
}

export interface CropperPropsModal {
    closeModal: (inp?: CropperResult) => void;
    aspect?: { x: number; y: number };
    CropperProps?: Partial<CropperProps>;
    CropperClasses?: string;
    shouldCompress?: boolean;
    children?: JSX.Element;
    isFullScreen?: boolean;
    imageSrc: File;
}

const CropImageModal = ({
    imageSrc,
    aspect = { x: 1, y: 1 },
    CropperClasses = '',
    CropperProps = {},
    shouldCompress = true,
    children,
    isFullScreen = false,
    closeModal,
}: CropperPropsModal) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const imgUrl = React.useMemo(
        () => (imageSrc ? URL.createObjectURL(imageSrc) : undefined),
        [imageSrc]
    );

    //   global state
    const onCropComplete = useCallback(
        (_croppedArea: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );
    const [loading, toggleLoading] = useState(false);

    const showCroppedImage = async () => {
        if (imageSrc) {
        } else return toast.error('image not loaded');
        try {
            toggleLoading(true);
            const { blob: croppedImageAwait } = await getCroppedImg(
                imgUrl,
                croppedAreaPixels,
                rotation
            );

            // @ts-ignore
            croppedImageAwait.lastModifiedDate = new Date();
            let file = new File([croppedImageAwait], imageSrc.name, {
                type: imageSrc.type,
            });

            if (!shouldCompress) {
                await closeModal({
                    imageFile: file,
                    browserImage: URL.createObjectURL(file),
                    blob: croppedImageAwait,
                });
            } else {
                // compress the image
                const result = await $compress(file);
                await closeModal({
                    imageFile: result,
                    browserImage: URL.createObjectURL(result),
                    blob: croppedImageAwait,
                });
            }
        } catch (e) {
            console.error(e);
            console.log(':)', 'ERROR', e);
            if (e instanceof Error) return toast.error(e.message);
            toast.error('Failed to load the image');
            closeModal();
        } finally {
            toggleLoading(false);
        }
    };

    return (
        <Modal open onClose={()=>closeModal()}>
            <ConditionalRender
                condition={imageSrc !== undefined}
                render={
                    <div
                        className={`${isFullScreen && styles.fullScreen} ${styles.Cropper + ' ' + CropperClasses}`}
                    >
                        <CloseIcon htmlColor='white' onClick={() => closeModal()} />
                        <div className={styles.cropContainer}>
                            <Cropper //@ts-ignore
                                image={imgUrl}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={aspect.x / aspect.y}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onRotationChange={setRotation}
                                onZoomChange={setZoom}
                                {...CropperProps}
                            />
                        </div>

                        {children}
                        <div className={styles.controls}>
                            <div className={styles.sliderContainer}>
                                <Typography
                                    variant="overline"
                                    classes={{ root: styles.sliderLabel }}
                                >
                                    بزرگنمایی
                                </Typography>
                                <Slider
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    classes={{ root: styles.slider }}
                                    onChange={(_e, zoom) =>
                                        setZoom(
                                            Array.isArray(zoom)
                                                ? zoom?.[0]
                                                : zoom
                                        )
                                    }
                                />
                            </div>
                            <div className={styles.sliderContainer}>
                                <Typography
                                    variant="overline"
                                    classes={{ root: styles.sliderLabel }}
                                >
                                    چرخش
                                </Typography>
                                <Slider
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    classes={{ root: styles.slider }}
                                    onChange={(e, rotation) =>
                                        setRotation(
                                            Array.isArray(rotation)
                                                ? rotation?.[0]
                                                : rotation
                                        )
                                    }
                                />
                            </div>

                            <LoadingButton
                                loading={loading}
                                variant="outlined"
                                onClick={showCroppedImage}
                                color="success"
                                className={`${styles.loadingButton} ${loading ? styles.loading : ''}`}
                            >
                                <CheckIcon className={styles.checkmarkIcon} />
                            </LoadingButton>
                        </div>
                    </div>
                }
            />
        </Modal>
    );
};

export default CropImageModal;
