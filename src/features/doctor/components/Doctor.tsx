"use client";

import { CopyableCell } from "@/components/copyable-cell/CopyableCell";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicinePreloader } from "@/features/medicine/components/MedicinePreloader";
import { useGetUserByIdQuery } from "@/features/user/user.api";
import Image from "next/image";

export const Doctor = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetUserByIdQuery(id);
  const doctorData = data?.data;
  const doctorProfile = doctorData?.doctorProfile;

  if (isLoading) return <MedicinePreloader />;

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Image
                src={doctorData?.profileImageUrl || "placeholder.png"}
                alt={doctorData?.name || "Doctor Photo"}
                height={120}
                width={120}
                className="h-[90px] w-[90px] object-contain rounded-lg border border-border"
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
              <div className="flex flex-col">
                <span className="font-medium text-2xl">
                  {doctorData?.name || "Not Set"}
                </span>
                <CopyableCell
                  value={doctorData?.email || "-"}
                  className="text-xs"
                >
                  {doctorData?.email || "-"}
                </CopyableCell>
              </div>
            </div>
          </CardTitle>
        </div>

        <div className="flex gap-2">
          <Badge variant={doctorProfile?.isAvailable ? "default" : "secondary"}>
            {doctorProfile?.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>

      <Separator className="mt-5 mb-4" />

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Phone
          </h4>
          <CopyableCell value={doctorData?.phone || "-"}>
            <p className="text-sm font-medium">{doctorData?.phone || "-"}</p>
          </CopyableCell>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Title
          </h4>
          <p className="text-sm font-medium">{doctorProfile?.title || "—"}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Registration Number
          </h4>
          <p className="text-sm font-medium">
            {doctorProfile?.registrationNo || "—"}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Years of Experience
          </h4>
          <p className="text-sm font-medium">
            {doctorProfile?.yearsExperience && " years"}
          </p>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Professional Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium mb-1">Consultation Fee</h4>
          <p className="text-sm text-foreground">
            {doctorProfile?.consultationFee
              ? `$${doctorProfile.consultationFee}`
              : "-"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Branch ID</h4>
          <CopyableCell value={doctorData?.branchId || "-"}>
            <p className="text-sm text-foreground">
              {doctorData?.branch?.name || "-"}
            </p>
          </CopyableCell>
        </div>
      </div>

      {/* Qualifications */}
      {(doctorProfile?.degrees && doctorProfile.degrees.length > 0) ||
      (doctorProfile?.qualifications &&
        doctorProfile.qualifications.length > 0) ? (
        <>
          <Separator className="mb-4" />
          <div className="mb-6">
            {doctorProfile?.degrees && doctorProfile.degrees.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Degrees</h4>
                <div className="flex flex-wrap gap-2">
                  {doctorProfile.degrees.map((degree, idx) => (
                    <Badge key={idx} variant="outline">
                      {degree}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {doctorProfile?.qualifications &&
              doctorProfile.qualifications.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Qualifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctorProfile.qualifications.map((qual, idx) => (
                      <Badge key={idx} variant="outline">
                        {qual}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </>
      ) : null}

      {/* About Section */}
      {doctorProfile?.about && (
        <>
          <Separator className="mb-4" />
          <div>
            <h4 className="text-sm font-medium mb-2">About</h4>
            <p className="text-sm text-foreground leading-relaxed">
              {doctorProfile.about}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
