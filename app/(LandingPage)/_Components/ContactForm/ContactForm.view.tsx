'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ContactFormFields } from './Components/ContactFormFields';
import { triggerHapticFeedback } from '@/lib/utils/hapticFeedback';

interface ContactFormViewProps {
    isOpen: boolean;
    isSuccess: boolean;
    formData: {
        name: string;
        phone: string;
        email: string;
        company: string;
    };
    errors: {
        name: string | null;
        phone: string | null;
        email: string | null;
        company: string | null;
    };
    touched: {
        name: boolean;
        phone: boolean;
        email: boolean;
        company: boolean;
    };
    isSubmitting: boolean;
    onFieldChange: (field: 'name' | 'phone' | 'email' | 'company', value: string) => void;
    onFieldBlur: (field: 'name' | 'phone' | 'email' | 'company') => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    translations: {
        title: string;
        subtitle: string;
        fields: {
            name: string;
            phone: string;
            email: string;
            company: string;
        };
        cta: string;
        ctaSubmitting: string;
        success: {
            title: string;
            message: string;
            done: string;
        };
    };
    errorColor: string;
}

/**
 * Contact form view component
 * 
 * Renders modal (desktop) or bottom sheet (mobile) with form fields or success state.
 * Handles smooth animations for open/close and height transitions.
 */
export function ContactFormView({
    isOpen,
    isSuccess,
    formData,
    errors,
    touched,
    isSubmitting,
    onFieldChange,
    onFieldBlur,
    onSubmit,
    onClose,
    translations,
    errorColor,
}: ContactFormViewProps): React.ReactElement {
    const formContentRef = useRef<HTMLDivElement>(null);
    const successContentRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [isSlideAnimating, setIsSlideAnimating] = useState(false);
    const [showExitingForm, setShowExitingForm] = useState(false);
    const previousSuccessRef = useRef<boolean>(false);
    const slideAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Detect mobile/desktop breakpoint
     */
    useEffect(() => {
        const checkMobile = (): void => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    /**
     * Handle render state - keep component mounted during exit animation
     */
    useEffect(() => {
        if (isOpen) {
            /**
             * Show component immediately when opening
             */
            setShouldRender(true);
            /**
             * Small delay to ensure DOM is ready before starting animation
             */
            const timer = setTimeout(() => {
                setIsMounted(true);
            }, 10);
            return () => clearTimeout(timer);
        } else {
            /**
             * Start exit animation
             */
            setIsMounted(false);
            /**
             * Wait for exit animation to complete before unmounting
             * Animation duration is 300ms
             */
            const unmountTimer = setTimeout(() => {
                setShouldRender(false);
            }, 300);
            return () => clearTimeout(unmountTimer);
        }
    }, [isOpen]);


    /**
     * Handle slide animation when transitioning from form to success
     */
    useEffect(() => {
        // Check if we're transitioning from form (!previousSuccess) to success (isSuccess)
        if (isSuccess && !previousSuccessRef.current && isOpen && isMounted) {
            // Clear any existing timeout
            if (slideAnimationTimeoutRef.current) {
                clearTimeout(slideAnimationTimeoutRef.current);
            }

            // Show exiting form and start animation
            setShowExitingForm(true);
            setIsSlideAnimating(false);

            // Start animation after DOM is ready
            const startTimeout = setTimeout(() => {
                setIsSlideAnimating(true);
            }, 50);

            // Clean up exiting form after animation completes
            // Animation duration: 400ms, total: 50ms delay + 400ms animation = 450ms
            slideAnimationTimeoutRef.current = setTimeout(() => {
                setShowExitingForm(false);
                setIsSlideAnimating(false);
            }, 450);

            return () => {
                clearTimeout(startTimeout);
                if (slideAnimationTimeoutRef.current) {
                    clearTimeout(slideAnimationTimeoutRef.current);
                }
            };
        } else if (!isSuccess && previousSuccessRef.current) {
            // Reset animation state when going back to form (shouldn't happen normally)
            setShowExitingForm(false);
            setIsSlideAnimating(false);
        }

        // Update previous success ref
        previousSuccessRef.current = isSuccess;
        return undefined;
    }, [isSuccess, isOpen, isMounted]);

    /**
     * Reset animation state when modal closes
     */
    useEffect(() => {
        if (!isOpen) {
            setShowExitingForm(false);
            setIsSlideAnimating(false);
            if (slideAnimationTimeoutRef.current) {
                clearTimeout(slideAnimationTimeoutRef.current);
            }
        }
    }, [isOpen]);

    /**
     * Lock/unlock body scroll when modal is open/closed
     * Prevents background page from scrolling when modal is active
     */
    useEffect(() => {
        if (shouldRender && isOpen) {
            /**
             * Lock scroll by setting overflow hidden on body and html
             * Store original overflow values to restore later
             */
            const originalBodyOverflow = document.body.style.overflow;
            const originalHtmlOverflow = document.documentElement.style.overflow;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            /**
             * Prevent layout shift by adding padding for scrollbar
             */
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
            
            return () => {
                /**
                 * Restore original overflow values when component unmounts or modal closes
                 */
                document.body.style.overflow = originalBodyOverflow;
                document.documentElement.style.overflow = originalHtmlOverflow;
                document.body.style.paddingRight = '';
            };
        } else if (!isOpen) {
            /**
             * Unlock scroll when modal closes
             */
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return undefined;
    }, [shouldRender, isOpen]);

    /**
     * Don't render anything if component shouldn't be rendered
     */
    if (!shouldRender) {
        return <></>;
    }

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className="fixed inset-0 z-[100] md:z-[100]"
                onClick={onClose}
                style={{
                    opacity: isMounted && isOpen ? 1 : 0,
                    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    background: isMobile
                        ? 'linear-gradient(to top, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%)'
                        : 'rgba(255, 255, 255, 0.2)',
                }}
            />

            {/* Modal Container Wrapper */}
            <div
                className="fixed z-[101] w-full md:w-auto left-0 md:left-1/2 bottom-0 md:bottom-auto md:top-1/2"
                style={{
                    transform: isMounted && isOpen
                        ? (isMobile ? 'translateY(0)' : 'translate(-50%, -50%)')
                        : (isMobile ? 'translateY(100%)' : 'translate(-50%, calc(-50% + 2rem))'),
                    opacity: isMounted && isOpen ? 1 : 0,
                    transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                }}
            >
                {/* Close Button - Floating above top right corner (Mobile only) */}
                {isMobile && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute -top-[50px] w-10 h-10 flex items-center justify-center text-white hover:opacity-70 transition-opacity rounded-full z-10"
                        style={{
                            backgroundColor: '#061B2D',
                            right: '10px',
                            outline: 'none',
                            border: 'none',
                        }}
                        aria-label="Close form"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}

                {/* Modal / Bottom Sheet */}
                <div
                    ref={modalRef}
                    className="w-full md:w-auto rounded-t-2xl md:rounded-2xl flex flex-col relative"
                    style={{
                        backgroundColor: '#061B2D',
                        width: isMobile ? '100%' : 'calc(32rem + 10px)',
                        maxWidth: isMobile ? '100%' : 'calc(32rem + 10px)',
                        minWidth: isMobile ? '100%' : 'calc(32rem + 10px)',
                        height: isMobile ? '600px' : '700px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                    }}
                >
                    {/* Close Button - Inside modal (Desktop only) */}
                    {!isMobile && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-white hover:opacity-70 transition-opacity rounded-full"
                            style={{
                                outline: 'none',
                                border: 'none',
                            }}
                            aria-label="Close form"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Content Container - Flex layout for fixed header/CTA and scrollable content */}
                    <div className="p-6 md:p-8 flex flex-col h-full min-h-0 relative overflow-hidden">
                        {/* Exiting Form - Slides out to left with fade */}
                        {showExitingForm && (
                            <div 
                                ref={formContentRef}
                                className="absolute inset-0 p-6 md:p-8 flex flex-col h-full min-h-0"
                                style={{
                                    transform: isSlideAnimating ? 'translateX(-100%)' : 'translateX(0)',
                                    opacity: isSlideAnimating ? 0 : 1,
                                    transition: isSlideAnimating 
                                        ? 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)' 
                                        : 'none',
                                    willChange: 'transform, opacity',
                                    zIndex: 10,
                                }}
                            >
                                <form 
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onSubmit(e);
                                    }} 
                                    className="flex flex-col h-full min-h-0"
                                >
                                    <ContactFormFields
                                        formData={formData}
                                        errors={errors}
                                        touched={touched}
                                        isSubmitting={isSubmitting}
                                        onFieldChange={onFieldChange}
                                        onFieldBlur={onFieldBlur}
                                        translations={translations}
                                        errorColor={errorColor}
                                    />
                                </form>
                            </div>
                        )}

                        {/* Current Form Content */}
                        {!isSuccess && !showExitingForm && (
                            <div ref={formContentRef} className="flex flex-col h-full min-h-0">
                                <form 
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onSubmit(e);
                                    }} 
                                    className="flex flex-col h-full min-h-0"
                                >
                                    <ContactFormFields
                                        formData={formData}
                                        errors={errors}
                                        touched={touched}
                                        isSubmitting={isSubmitting}
                                        onFieldChange={onFieldChange}
                                        onFieldBlur={onFieldBlur}
                                        translations={translations}
                                        errorColor={errorColor}
                                    />
                                </form>
                            </div>
                        )}

                        {/* Success Content - Slides in from right with fade */}
                        {isSuccess && (
                            <div 
                                ref={successContentRef} 
                                className="flex flex-col h-full min-h-0"
                                style={{
                                    transform: showExitingForm 
                                        ? (isSlideAnimating ? 'translateX(0)' : 'translateX(100%)')
                                        : 'translateX(0)',
                                    opacity: showExitingForm 
                                        ? (isSlideAnimating ? 1 : 0)
                                        : 1,
                                    transition: showExitingForm && isSlideAnimating
                                        ? 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)'
                                        : 'none',
                                    willChange: 'transform, opacity',
                                    zIndex: 20,
                                }}
                            >
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    {/* Success Icon */}
                                    <div className="mb-4 md:mb-6">
                                        <Image
                                            src="/SVGs/ContactFormSuvvessIcon.svg"
                                            alt="Success"
                                            width={80}
                                            height={80}
                                            className="w-16 h-16 md:w-20 md:h-20"
                                        />
                                    </div>

                                    {/* Success Title */}
                                    <h2 className="text-white font-semibold text-xl md:text-2xl text-center mb-2 md:mb-3">
                                        {translations.success.title}
                                    </h2>

                                    {/* Success Message */}
                                    <p className="text-white text-center text-sm md:text-base mb-6 md:mb-8 opacity-80 max-w-md">
                                        {translations.success.message}
                                    </p>
                                </div>

                                {/* Fixed CTA Button - Done */}
                                <div className="flex-shrink-0 mt-6 md:mt-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            triggerHapticFeedback();
                                            onClose();
                                        }}
                                        className="w-full px-6 py-3 md:py-4 rounded-full text-white font-medium text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                                        style={{
                                            backgroundColor: '#0090FE',
                                        }}
                                    >
                                        <span>{translations.success.done}</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

