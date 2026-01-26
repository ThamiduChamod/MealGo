import  React, { createContext } from 'react'
import { ActivityIndicator, View } from 'react-native';

interface LoaderContextProps {
    shoeLoader: () => void;
    hideLoader: () => void;
    isLoading: boolean;
}

export const LoaderContext = createContext<LoaderContextProps>({
    shoeLoader: () => {},
    hideLoader: () => {},
    isLoading: false
})

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const shoeLoader = () => {setIsLoading(true);}
    const hideLoader = () => {setIsLoading(false);}

    return (
        <LoaderContext.Provider value={{ shoeLoader, hideLoader, isLoading }}>
            {children}

            {isLoading && (
                <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/30">
                    <View className="bg-white p-6 rounded-2xl shadow-lg">
                        <ActivityIndicator size="large" color="#1e40af" />
                    </View>
                </View>
            )}
        </LoaderContext.Provider>
    );
}