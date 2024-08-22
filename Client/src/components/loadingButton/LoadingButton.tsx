import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  loader?: JSX.Element;
}

export const LoadingButton = (props: LoadingButtonProps) => {
  const { isLoading, loader, children, ...buttonProps } = props;

  return (
    <Button
      {...buttonProps}
      disabled={buttonProps.disabled || isLoading}
      endIcon={!isLoading && buttonProps.endIcon}
      startIcon={!isLoading && buttonProps.startIcon}
    >
      {isLoading
        ? loader ?? (
            <CircularProgress
              size={22}
              color={buttonProps.color ?? "secondary"}
            />
          )
        : children}
    </Button>
  );
};
