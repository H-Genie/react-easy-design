import LoaderBasic from "./LoaderBasic";
import LoaderFullScreen from "./LoaderFullScreen";
declare function Loader(): null;
declare namespace Loader {
    var Basic: typeof LoaderBasic;
    var FullScreen: typeof LoaderFullScreen;
}
export default Loader;
