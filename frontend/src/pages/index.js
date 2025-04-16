import { IndexLayout } from '@components/Layout';

export default function Home() {
    return (
        <div>
            Flow
        </div>
    );
};

Home.getLayout = function getLayout(page) {
    return (
        <IndexLayout>{page}</IndexLayout>
    )
}
