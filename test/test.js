import { parseEditBlock, performSearchReplace } from '../dist/tools/edit.js';

async function runTests() {
    try {
        // Test parseEditBlock
        const testBlock = `test.txt
<<<<<<< SEARCH
old content
=======
new content
>>>>>>> REPLACE`;

        const parsed = await parseEditBlock(testBlock);
        console.log('Parse test passed:', parsed);

        // Create a test file
        const fs = await import('fs/promises');
        const testFilePath = 'test/test.txt';
        await fs.writeFile(testFilePath, 'This is old content to replace');

        // Test performSearchReplace
        await performSearchReplace(testFilePath, {
            search: 'old content',
            replace: 'new content'
        });

        const result = await fs.readFile(testFilePath, 'utf8');
        console.log('File content after replacement:', result);

        if (result.includes('new content')) {
            console.log('Replace test passed!');
        } else {
            throw new Error('Replace test failed!');
        }

        // Cleanup
        await fs.unlink(testFilePath);
        console.log('All tests passed! 🎉');
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

runTests();